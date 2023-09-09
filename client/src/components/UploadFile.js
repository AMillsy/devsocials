import React from "react";
import { useMutation } from "@apollo/client";
import { SINGLE_UPLOAD, MULTI_UPLOAD } from "../utils/mutations";
const UploadFile = () => {
  const [mutate, { loading, error }] = useMutation(SINGLE_UPLOAD);
  const [multiUploadMutate, { loading: multiLoad, error: multiError }] =
    useMutation(MULTI_UPLOAD);
  const sinlgeUpload = async ({ target }) => {
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

  const multiUpload = async ({ target }) => {
    console.log(target);
    const { validity, files } = target;

    if (validity.valid) {
      try {
        const { data } = await multiUploadMutate({
          variables: { files },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const onChange = async ({ target }) => {
    await multiUpload({ target });
  };

  if (loading) return <div>Loading....</div>;
  if (error) return <div>Error has occured</div>;

  return <input type="file" multiple required onChange={onChange} />;
};

export default UploadFile;
