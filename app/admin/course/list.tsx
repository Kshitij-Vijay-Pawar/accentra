import { Datagrid, List, TextField } from "react-admin";

export const CourseList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" label="ID" />
        <TextField source="title" label="Title" />
        <TextField source="imageSrc" label="imageSrc" />
      </Datagrid>
    </List>
  );
};