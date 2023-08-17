import Nation from '@root/models/Nation'

export const nationSeeder = async () => {
  const nations = [
    {
      name: 'VietNam',
      isDeleted: false,
    },
    {
      name: 'Japan',
      isDeleted: false,
    },
  ]
  await Nation.insertMany(nations)
}

export const getAllNations = async () => Nation.find().lean()
