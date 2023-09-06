import React from "react";
import { useMutation, gql } from "@apollo/client";

const SINGLE_UPLOAD = gql`
  mutation Mutation($file: Upload!) {
    singleUpload(file: $file) {
      encoding
      filename
      mimetype
      url
    }
  }
`;

const UploadFile = () => {
  const [mutate, { loading, error }] = useMutation(SINGLE_UPLOAD);

  const onChange = ({ target }) => {
    console.log(target.files);
    const {
      validity,
      files: [file],
    } = target;

    validity.valid && mutate({ variables: { file } });
  };

  if (loading) return <div>Loading....</div>;
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

  return (
    <React.Fragment>
      <input type="file" required onChange={onChange} />
    </React.Fragment>
  );
};

export default UploadFile;
