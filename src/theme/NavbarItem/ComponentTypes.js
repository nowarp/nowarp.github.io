import {useLocation} from '@docusaurus/router';
import ComponentTypes from '@theme-original/NavbarItem/ComponentTypes';
import DocsVersionDropdownNavbarItem from
    '@theme/NavbarItem/DocsVersionDropdownNavbarItem';
import SearchNavbarItem from '@theme/NavbarItem/SearchNavbarItem';
import React from 'react';

const MistiVersionDropdown = (props) => {
  const location = useLocation();
  const isMistiPath = location.pathname.includes('/tools/misti/');
  if (!isMistiPath) return null;
  return <DocsVersionDropdownNavbarItem
              docsPluginId={"default"}
              dropdownItemsBefore={[]}
              dropdownItemsAfter={[]}
          />;
};

const MistiSearchNavbarItem = (props) => {
  const location = useLocation();
  const isMistiPath = location.pathname.includes('/tools/misti/');
  if (!isMistiPath) return null;
  return <SearchNavbarItem {...props} />;
};

export default {
  ...ComponentTypes,
  'docsVersionDropdown': MistiVersionDropdown,
  'search': MistiSearchNavbarItem,
};
