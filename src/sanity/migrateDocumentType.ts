import { createClient } from "@sanity/client";

type Doc = {
  _id: string;
  _rev?: string;
  _type: string;
  incomingReferences?: Doc[];
};

const token = process.env.SANITY_API_EDITOR_TOKEN;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = "2023-03-01";

const client = createClient({
  apiVersion,
  projectId,
  dataset,
  token,
});

const OLD_TYPE = "technology";
const NEW_TYPE = "skill";

const fetchDocuments = () =>
  client.fetch(
    `*[_type == $oldType][0...10] {..., "incomingReferences": *[references(^._id)]{...}}`,
    { oldType: OLD_TYPE },
  );

const buildMutations = (docs: Doc[]) => {
  // eslint-disable-next-line
  const mutations: any = [];

  docs.forEach((doc) => {
    // eslint-disable-next-line
    console.log(OLD_TYPE, doc._id);
    // Updating an document _type field isn't allowed, we have to create a new and delete the old
    const newDocId = `${doc._id}-migrated`;
    const newDocument = { ...doc, ...{ _id: newDocId, _type: NEW_TYPE } };
    delete newDocument.incomingReferences;
    delete newDocument._rev;

    mutations.push({ create: newDocument });
    if (!doc.incomingReferences) {
      return;
    }
    // Patch each of the incoming references
    doc.incomingReferences.forEach((referencingDocument) => {
      // eslint-disable-next-line
      console.log("ref", referencingDocument._id);
      // ⚠️ We're assuming the field is named the same as the type!
      // There might be another structure involved, perhaps an array, that needs patching
      const updatedReference = {
        [NEW_TYPE]: {
          _ref: newDocId,
          _type: "reference",
        },
      };
      mutations.push({
        id: referencingDocument._id,
        patch: {
          set: updatedReference,
          unset: [OLD_TYPE],
          ifRevisionID: referencingDocument._rev,
        },
      });
    });

    // Apply the delete mutation after references have been changed
    mutations.push({ delete: doc._id });
  });
  return mutations.filter(Boolean);
};

// eslint-disable-next-line
const createTransaction = (mutations: any) => {
  // eslint-disable-next-line
  return mutations.reduce((tx: any, mutation: any) => {
    if (mutation.patch) {
      return tx.patch(mutation.id, mutation.patch);
    }
    if (mutation.delete) {
      return tx.delete(mutation.delete);
    }
    if (mutation.create) {
      return tx.createIfNotExists(mutation.create);
    }
  }, client.transaction());
};

// eslint-disable-next-line
const migrateNextBatch: any = async () => {
  const documents = await fetchDocuments();
  if (documents.length === 0) {
    // eslint-disable-next-line
    console.log("No more documents to migrate!");
    return null;
  }
  const mutations = buildMutations(documents);
  const transaction = createTransaction(mutations);
  await transaction.commit();
  return migrateNextBatch();
};

// eslint-disable-next-line
migrateNextBatch().catch((err: any) => {
  // eslint-disable-next-line
  console.error(JSON.stringify(err, null, 2));
  process.exit(1);
});
