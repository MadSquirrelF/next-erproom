export interface ISkeletonSchamaBlock {
  id: number;
  children: ISkeletonSchamaBlock[];
}

export const skeletonDataSchema = {
  id: 1,
  children: [
    {
      id: 2,
      children: [
        {
          id: 6,
          children: [],
        },
        {
          id: 7,
          children: [],
        },
      ],
    },
    {
      id: 3,
      children: [],
    },
    {
      id: 4,
      children: [],
    },
    {
      id: 5,
      children: [],
    },
  ],
};
