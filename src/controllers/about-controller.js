export const aboutController = {
    index: {
      handler: function (request, h) {
        const viewData = {
          title: "About Points of Interest",
        };
        return h.view("about-view", viewData);
      },
    },
  };