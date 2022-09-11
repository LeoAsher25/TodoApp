export const getAccessLevelText = (value) => {
  switch (value) {
    case 1:
      return "Director";

    case 2:
      return "Manager";

    case 3:
      return "Member";

    default:
      return "---";
  }
};

export const getTodoStatus = (value) => {
  switch (value) {
    case 0:
      return "WORKING";

    case 1:
      return "PENDING";

    case 2:
      return "CANCELLED";

    case 3:
      return "COMPLETED";

    case 4:
      return "DELETED";

    default:
      return "---";
  }
};

export const getUserStatus = (value) => {
  switch (value) {
    case 0:
      return "WORKING";

    case 1:
      return "SUSPEND";

    case 2:
      return "QUIT";

    case 3:
      return "DELETE";

    default:
      return "---";
  }
};

export const convertTodoListChild = (todoList) => {
  const newList = todoList.map((item) => {
    const newItem = { ...item.root };
    if (item.child && item.child.length > 0) {
      newItem.children = convertTodoListChild(item.child);
    }
    return newItem;
  });

  return newList;
};
