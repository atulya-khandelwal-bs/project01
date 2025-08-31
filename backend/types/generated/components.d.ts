import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentsCompnayLogo extends Struct.ComponentSchema {
  collectionName: 'components_components_compnay_logos';
  info: {
    displayName: 'compnayLogo';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.String;
  };
}

export interface ComponentsLink extends Struct.ComponentSchema {
  collectionName: 'components_components_links';
  info: {
    displayName: 'link';
  };
  attributes: {
    text: Schema.Attribute.String;
    url: Schema.Attribute.Text;
  };
}

export interface ComponentsSearchBar extends Struct.ComponentSchema {
  collectionName: 'components_components_search_bars';
  info: {
    displayName: 'searchBar';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    searchSpace: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'enter song name'>;
  };
}

export interface ComponentsSongs extends Struct.ComponentSchema {
  collectionName: 'components_components_songs';
  info: {
    displayName: 'songs';
  };
  attributes: {
    description: Schema.Attribute.Text;
    genre: Schema.Attribute.String;
    isPlayed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    link: Schema.Attribute.Media<'audios', true>;
    name: Schema.Attribute.String;
  };
}

export interface ComponentsUserPass extends Struct.ComponentSchema {
  collectionName: 'components_components_user_passes';
  info: {
    displayName: 'userPass';
  };
  attributes: {
    usermail: Schema.Attribute.Email;
    userPassword: Schema.Attribute.Password;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
  };
  attributes: {
    description: Schema.Attribute.Text;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    links: Schema.Attribute.Component<'components.link', true>;
    logo: Schema.Attribute.Component<'components.compnay-logo', false>;
  };
}

export interface LayoutHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_hero_sections';
  info: {
    displayName: 'Hero Section';
  };
  attributes: {
    Background: Schema.Attribute.Media<'images'>;
    heading: Schema.Attribute.String;
    searchBar: Schema.Attribute.Component<'components.search-bar', false>;
    songs: Schema.Attribute.Component<'components.songs', true>;
    subHeading: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'components.compnay-logo': ComponentsCompnayLogo;
      'components.link': ComponentsLink;
      'components.search-bar': ComponentsSearchBar;
      'components.songs': ComponentsSongs;
      'components.user-pass': ComponentsUserPass;
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
      'layout.hero-section': LayoutHeroSection;
    }
  }
}
