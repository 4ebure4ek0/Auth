import { type ReactElement } from 'react';

function Error(props: any): ReactElement {
  return <span>{props.error}</span>;
}

export default Error;
