import React from 'react';
import { Page } from './Page';
import { Form, required, minLength, Values } from './Form';
import { Field } from './Field';
import { postQuestion } from '../QuestionsData';

export const AskPage = () => {
  const handleSubmit = async (values: Values) => {
    const question = await postQuestion({
      title: values.title,
      content: values.content,
      userName: 'Fred',
      created: new Date(),
    });

    return { success: question ? true : false };
  };
  return (
    <Page title="Ask a Question">
      <Form
        submitCaption="Submit Your Question"
        validationRules={{
          title: [{ validator: required }, { validator: minLength, arg: 10 }],
          content: [{ validator: required }, { validator: minLength, arg: 50 }],
        }}
        onSubmit={handleSubmit}
        failureMessage="There was a problem with your question"
        successMessage="Your question was successfully submitted">
        <Field name="title" label="Title" />
        <Field name="content" label="Content" type="TextArea" />
      </Form>
    </Page>
  );
};
export default AskPage;

// import React, { FC, useEffect } from 'react';
// import { Page } from './Page';
// import { Form, required, minLength, Values, SubmitResult } from './Form';
// import { Field } from './Field';
// import { PostQuestionData, QuestionData } from '../QuestionsData';

// import { connect } from 'react-redux';
// import { ThunkDispatch } from 'redux-thunk';
// import {
//   postQuestionActionCreator,
//   AppState,
//   clearPostedQuestionActionCreator,
// } from '../reduxState/Store';
// import { AnyAction } from 'redux';

// interface Props {
//   postQuestion: (question: PostQuestionData) => Promise<void>;
//   postedQuestionResult?: QuestionData;
//   clearPostedQuestion: () => void;
// }

// const AskPage: FC<Props> = ({ postQuestion, postedQuestionResult, clearPostedQuestion }) => {
//   useEffect(() => {
//     return function cleanUp() {
//       clearPostedQuestion();
//     };
//   }, [clearPostedQuestion]);

//   const handleSubmit = async (values: Values) => {
//     postQuestion({
//       title: values.title,
//       content: values.content,
//       userName: 'Fred',
//       created: new Date(),
//     });
//   };

//   let submitResult: SubmitResult | undefined;
//   if (postedQuestionResult) {
//     submitResult = { success: postedQuestionResult !== undefined };
//   }

//   return (
//     <Page title="Ask a question">
//       <Form
//         submitCaption="Submit your question"
//         validationRules={{
//           title: [{ validator: required }, { validator: minLength, arg: 10 }],
//           content: [{ validator: required }, { validator: minLength, arg: 50 }],
//         }}
//         onSubmit={handleSubmit}
//         submitResult={submitResult}
//         successMessage="Your question was successfully submitted"
//         failureMessage="There was a propblem with your question">
//         <Field name="title" label="Title" />
//         <Field name="content" label="Content" type="TextArea" />
//       </Form>
//     </Page>
//   );
// };

// const mapStateToProps = (store: AppState) => {
//   return {
//     postedQuestionResult: store.questions.postedResult,
//   };
// };

// const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
//   return {
//     postQuestion: (question: PostQuestionData) => dispatch(postQuestionActionCreator()),
//     clearPostedQuestion: () => dispatch(clearPostedQuestionActionCreator()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(AskPage);
