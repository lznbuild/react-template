import React from 'react';

import Content from 'components/Content';
import Sub1 from 'bundle-loader?lazy&name=sub1!./sub1';
import Sub2 from 'bundle-loader?lazy&name=sub2!./sub2';
import './index.less';

const pageComponents = [Sub1, Sub2];

const Mod1 = () => <Content name="mod1" pageComponents={pageComponents} />;
export default Mod1;
