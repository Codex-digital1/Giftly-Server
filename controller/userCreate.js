const User= require("../model/userSchema")

const userCreate = async (req, res) => {
    try {
        const { name, email, phoneNumber, address,profileImage,chat } = req.body;
        console.log(chat)
        
        // console.log(req.body);
        if (!email || !name ) {
            return res.status(400).json({ message: 'All fields are required' });
          }
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.json({ message: 'User already exists' });
        }
        
        // console.log(16,userExists);
        // console.log(16,userExists);
        // Create a new user object
        const user = new User({
          name,
          email,
          profileImage,
          phoneNumber,
          address: {
            street: address.street,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            country: address.country,
          },
          chat: {
            sender:chat.sender,
            receiver: chat.receiver,
          },
        });
    // console.log(user);
    // console.log(user);
        // Save the user to the database
        const savedUser = await user.save();
    // console.log(33,savedUser);
    // console.log(33,savedUser);
        // Respond with the saved user (excluding password)
        res.status(201).json({
          success: true,
          data: {
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            phoneNumber: savedUser.phoneNumber,
            address: savedUser.address,
          },
          message: 'User registered successfully',
        });
      } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
    }

module.exports = userCreate;
