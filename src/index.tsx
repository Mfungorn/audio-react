import * as React from 'react';
import { render } from 'react-dom'
import {Root} from "./components/Root";

import { configureFakeBackend } from './helpers/fakeApi';
configureFakeBackend();

render(<Root />, document.getElementById('root'));
