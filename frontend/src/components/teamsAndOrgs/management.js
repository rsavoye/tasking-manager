import React from 'react';
import { Link } from '@reach/router';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { ManagementMenu } from './menu';
import { CustomButton } from '../button';
import { PlusIcon, WasteIcon } from '../svgIcons';

export const ViewAllLink = ({ link }: Object) => (
  <Link to={link} className="dib mt2 fr red link">
    <span>
      <FormattedMessage {...messages.viewAll} />
    </span>
  </Link>
);

export const AddButton = () => (
  <CustomButton className="red bg-transparent ba b--red barlow-condensed pv1">
    <PlusIcon height="20px" width="20px" className="v-mid" />
    <span className="v-mid f3 ttu pl2">
      <FormattedMessage {...messages.add} />
    </span>
  </CustomButton>
);

export const DeleteButton = ({ className, onClick }: Object) => (
  <CustomButton
    className={`red bg-transparent ba b--red barlow-condensed pv1 ${className}`}
    onClick={onClick}
  >
    <WasteIcon height="20px" width="20px" className="v-mid" />
    <span className="v-mid f3 ttu pl2">
      <FormattedMessage {...messages.delete} />
    </span>
  </CustomButton>
);

export function Management(props) {
  return (
    <div className="pull-center cf pb4 ph6-l bg-tan">
      <ManagementMenu />
      <h3 className="barlow-condensed f2 ma0 pv3 v-mid dib ttu">{props.title}</h3>
      {props.showAddButton && (
        <Link to={'new/'} className="dib ml3">
          <AddButton />
        </Link>
      )}
      <div className="w-100 cf dib">{props.children}</div>
    </div>
  );
}
