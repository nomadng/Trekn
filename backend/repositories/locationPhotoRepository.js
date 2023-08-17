import LocationPhoto from '@root/models/LocationPhoto'

export const randomLocationPhotoByConditions = async (conditions) => LocationPhoto.findOne(conditions).exec()
