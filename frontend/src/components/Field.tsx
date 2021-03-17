import React, { FC, useContext, ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { fontFamily, fontSize, gray5, gray2, gray6 } from './Styles';
import { FormContext } from './Form';

interface Props {
  name: string;
  label?: string;
  type?: 'Text' | 'TextArea' | 'Password';
}

const Div1 = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label1 = styled.label`
  font-weight: bold;
`;

const MyInput1 = styled.input`
  box-sizing: border-box;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  margin-bottom: 5px;
  padding: 8px 10px;
  border: 1px solid ${gray5};
  border-radius: 3px;
  color: ${gray2};
  background-color: white;
  width: 100%;
  :focus {
    outline-color: ${gray5};
  }
  :disabled {
    background-color: ${gray6};
  }
`;

const MyTextArea1 = styled.textarea`
  box-sizing: border-box;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  margin-bottom: 5px;
  padding: 8px 10px;
  border: 1px solid ${gray5};
  border-radius: 3px;
  color: ${gray2};
  background-color: white;
  width: 100%;
  :focus {
    outline-color: ${gray5};
  }
  :disabled {
    background-color: ${gray6};
  }
  height: 100px;
`;

const ErrorDiv = styled.div`
  font-size: 12px;
  color: red;
`;

export const Field: FC<Props> = ({ name, label, type = 'Text' }) => {
  const { setValue, touched, setTouched, validate } = useContext(FormContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    if (setValue) {
      setValue(name, e.currentTarget.value);
    }
    if (touched[name]) {
      if (validate) {
        validate(name);
      }
    }
  };

  const handleBlur = () => {
    if (setTouched) {
      setTouched(name);
    }
    if (validate) {
      validate(name);
    }
  };

  return (
    <FormContext.Consumer>
      {({ values, errors }) => (
        <Div1>
          {label && <Label1 htmlFor={name}>{label}</Label1>}
          {(type === 'Text' || type === 'Password') && (
            <MyInput1
              type={type.toLowerCase()}
              id={name}
              value={values[name] === undefined ? '' : values[name]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
          {type === 'TextArea' && (
            <MyTextArea1
              id={name}
              value={values[name] === undefined ? '' : values[name]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          )}
          {errors[name] &&
            errors[name].length > 0 &&
            errors[name].map((error) => {
              return <ErrorDiv key={error}>{error}</ErrorDiv>;
            })}
        </Div1>
      )}
    </FormContext.Consumer>
  );
};
