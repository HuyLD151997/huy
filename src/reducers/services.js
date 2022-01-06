var initialState = [
  {
    id: 1,
    description: "huy",
    unitPrice: 400,
    status: true,
    dateCreated: "10-6-2021",
    dateUpdated: "21-6-2021",
  },
  {
    id: 2,
    description: "nam",
    unitPrice: 700,
    status: false,
    dateCreated: "10-6-2021",
    dateUpdated: "21-6-2021",
  },
];

const services = (state = initialState, action) => {
  switch (action.key) {
    default:
      return [...state];
  }
};

export default services;
