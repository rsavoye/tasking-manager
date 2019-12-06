import React from 'react';
import { Link } from '@reach/router';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { useInboxQueryParams, stringify } from '../../hooks/UseInboxQueryAPI';

/*REMOVE ME*/
import { ProjectSearchBox } from '../projects/projectSearchBox';
import { useExploreProjectsQueryParams } from '../../hooks/UseProjectsQueryAPI';

export const InboxNav = props => {
    const [fullProjectsQuery, setProjQuery] = useExploreProjectsQueryParams();
    const [inboxQuery, setQuery] = useInboxQueryParams();
  
    const linkCombo = 'link ph3 f6 pv2 ba b--grey-light';
  
    return (
        /* mb1 mb2-ns (removed for map, but now small gap for more-filters) */
        <header className=" w-100 ">
        <div className="cf">
            <div className="w-75-l w-60 fl">
            <h3 className="f2 ttu barlow-condensed fw8">
                <FormattedMessage {...messages.notifications} />
            </h3>
            </div>
        </div>
        <div className="mt2 mb1 ph2 dib lh-copy w-100 cf">
            <div className="w-90-ns w-100 fl dib">
            <div className="dib">
                <div className="mv2 dib">
                </div>

                <ProjectSearchBox
                className="dib fl mh1"
                setQuery={setProjQuery}
                fullProjectsQuery={fullProjectsQuery}
                placeholder="Search (localize)" />

                <Link
                    to="./"
                    className={`red link ph3 f6 pv2 mh1 fr
                    `}
                >
                    <FormattedMessage {...messages.notifications} />
                </Link>

            </div>
            </div>
            <div className="w-10-ns w-100 fr">
            {/* <ShowMapToggle /> */}
            </div>
        </div>
        <div className="ma2">
                <Link
                    to="inbox/?orderBy=date&orderByType=desc&page=1&pageSize=10&type=4"
                    className={`di di-m mh1 ${linkCombo}
                    `}
                >
                    <FormattedMessage {...messages.all} />
                </Link>
                <Link
                    to="inbox/?orderBy=date&orderByType=desc&page=1&pageSize=10&type=6"
                    className={`di di-m mh1 ${linkCombo}
                    `}
                >
                    <FormattedMessage {...messages.messages} />
                </Link>
                <Link
                to={'inbox/?orderBy=date&orderByType=desc&page=1&pageSize=10&type=8'}
                className={`di di-m mh1 ${linkCombo} `}
                >
                <FormattedMessage {...messages.tasks} />
                </Link>
                <Link
                to='inbox/?orderBy=date&orderByType=desc&page=1&pageSize=10&type=9'
                className={`di di-m mh1 ${linkCombo} `}
                >
                <FormattedMessage {...messages.projects} />
                </Link>
            </div>
        {props.children}
        </header>
    );
                }