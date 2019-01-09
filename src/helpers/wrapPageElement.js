import React from 'react';
import Transition from '../components/transition';

const wrapPageElement = ({ element, props }) => <Transition {...props}>{element}</Transition>;

export default wrapPageElement;
