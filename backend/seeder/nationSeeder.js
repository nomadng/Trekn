import Nation from '@root/models/Nation'

export const nationSeeder = async () => {
  const nations = [
    {
      _id: '64df3f8652402d78732a7163',
      name: 'Vietnam',
      isDeleted: false,
    },
    {
      _id: '64df3fe7ac3ce6f0ade1400a',
      name: 'Japan',
      isDeleted: false,
    },
    {
      _id: '64df3ff604c3a65e5443671f',
      name: 'India',
      isDeleted: false,
    },
    {
      _id: '64df400095a6df6073a08ebe',
      name: 'Spain',
      isDeleted: false,
    },
    {
      _id: '64df4007c7b9965a87a58b95',
      name: 'UK',
      isDeleted: false,
    },
  ]
  await Nation.insertMany(nations)
}

export const getAllNations = async () => Nation.find().lean()
