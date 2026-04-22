export type IdentityStory = {
  label: string;
  title: string;
  story: string;
  tags?: string[];
  highlights?: string[];
};

export type DualIdentityContent = {
  artist: Required<IdentityStory>;
  real: Required<IdentityStory>;
};
