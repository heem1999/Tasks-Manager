export type TaskProps = {
  title: string;
  description: string;
  date: string;
  status: string;
  _id?: string;
};

type task = TaskProps;
type handleEditClick = Function;
export type EditTaskProps = task | handleEditClick;
