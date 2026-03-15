import type { Server } from "socket.io";

export const ioOnConnection = (io: Server) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });

    socket.on("getProductList", (listName: string) => {
        console.log("A user wants to get a productlist", listName);

        socket.emit("gotProductList", {name: listName, abilities: []})
    })
  });
};
