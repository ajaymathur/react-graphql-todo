import { css, injectGlobal } from 'emotion';

injectGlobal`
  *{
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`

export const Container = css`
  box-sizing: border-box;
  padding: 0 15px;
  width: 100%;
`;

export const Task = css`
  display: inline-block;
  border: 1px solid black;
  width: 80%;
`;

export const TaskStatus = css`
  display: inline-block;
  border: 1px solid black;
  width: 15%;
`;
