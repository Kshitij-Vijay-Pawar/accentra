import { Datagrid, List, TextField, ReferenceField } from "react-admin";

export const UnitList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" label="ID" />
        <TextField source="title" label="Title" />
        <TextField source="description" label="Description" />
        <ReferenceField source="courseId" reference="courses"/>
        <TextField source="order" label="order" />
      </Datagrid>
    </List>
  );
};