import User from '../models/user.js'

const getAllUsers = async (req, res) => {
    try {
        const addedBy = req.user._id;

        const response = await User.find({ addedBy })

        res.status(200).json({ message: 'success', data: response, error: '' })

    } catch (error) {
        res.status(500).json({ message: 'faild', data: '', error: error.toString() })
    }
}

const getOneUser = async (req, res) => {
    try {
        const _id = req.params.id;

        const response1 = await User.findById(_id)

        if (!response1) return res.status(404).json({ message: 'faild', data: response1, error: "User Not Found!" })

        res.status(200).json({ message: 'success', data: response1, error: '' })

    } catch (error) {
        res.status(500).json({ message: 'faild', data: '', error: error.toString() })
    }
}

const addOneUser = async (req, res) => {
    try {
        const data = req.body;

        const response = await User.create({ ...data, userType: "Farmer" })

        res.status(201).json({ message: 'success', data: response, error: '' })

    } catch (error) {
       
        res.status(500).json({ message: 'faild', data: '', error: error?.toString() })
    }
}

const updateOneUser = async (req, res) => {
    try {
        const _id = req.params.id;

        const data = req.body

        const response1 = await User.findById(_id)

        if (!response1) return res.status(404).json({ message: 'faild', data: response1, error: "User Not Found!" })

        if (response1?.userType !== "SuperAdmin") {

            let unOuthFields = '';

            for (const key in data) {
                if (key === 'password' || key === 'salt' || key === 'userType' || key === 'status') {

                    unOuthFields = unOuthFields?.length > 0 ? `${unOuthFields}, ${key}` : `${key}`

                    delete data[key]
                }
            }

            if (unOuthFields) return res.status(404).json({ message: 'faild', data: '', error: `You are unauthorised!, Please request Admin to update ${unOuthFields}` })
        }

        const response2 = await User.findByIdAndUpdate(_id, { ...data }, { new: true })

        res.status(200).json({ message: 'success', data: response2, error: '' })

    } catch (error) {
        res.status(500).json({ message: 'faild', data: '', error: error.toString() })
    }
}

const deleteOneUser = async (req, res) => {
    try {
        const _id = req.params.id;

        const response1 = await User.findById(_id)

        if (!response1) return res.status(404).json({ message: 'faild', data: response1, error: "User Not Found!" })

        // if (response1?.userType !== "SuperAdmin") {

        //     return res.status(404).json({ message: 'faild', data: '', error: `You are unauthorised!, Please request Admin to delete user:${_id}` })

        // }

        const response2 = await User.deleteOne({ _id })

        res.status(200).json({ message: 'success', data: response2, error: '' })

    } catch (error) {
        res.status(500).json({ message: 'faild', data: '', error: error.toString() })
    }
}



export { getAllUsers, getOneUser, addOneUser, updateOneUser, deleteOneUser }

