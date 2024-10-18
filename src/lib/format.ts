export const formatDate = (inputDate: string | undefined) =>
  inputDate
    ? new Date(inputDate).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "";
