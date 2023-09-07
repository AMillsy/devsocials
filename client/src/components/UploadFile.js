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

  const onChange = async ({ target }) => {
    console.log(target.files);
    const {
      validity,
      files: [file],
    } = target;

    if (validity.valid) {
      try {
        const { data } = await mutate({ variables: { file } });
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (loading) return <div>Loading....</div>;
  if (error) return <div>Error has occured</div>;

  return <input type="file" required onChange={onChange} />;
};

export default UploadFile;
