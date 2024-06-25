import {
  HttpBadRequestError,
  HttpInternalServerError,
  HttpNotFoundError,
} from "../../lib/errors";
import {
  LoginUserDto,
  RegisterUserDto,
  UpdateProfileDto,
} from "../../dto/user.dto";
import { User } from "../../models/userModel";
import { generateToken } from "../../utils/utils";

type ServiceResponse<T> = {
  data?: T;
  error?: HttpBadRequestError | HttpInternalServerError;
};

export default class UserService {
  // @desc Register a new user
  // @router /api/users/register
  // @access public
  public async registerUser(
    userData: RegisterUserDto
  ): Promise<ServiceResponse<any>> {
    const { name, email, password } = userData;

    try {
      const userExist = await User.findOne({ email });

      if (userExist) {
        return { error: new HttpBadRequestError("User already exist.", []) };
      }

      const newUser = await User.create({
        name,
        email,
        password,
      });

      if (newUser) {
        const { password: _, ...userData } = newUser.toObject();
        return { data: userData };
      } else {
        return { error: new HttpBadRequestError("Invalid user data", []) };
      }
    } catch (error) {
      console.log(error);
      return {
        error: new HttpInternalServerError(
          "An error occurred during registration."
        ),
      };
    }
  }

  // @desc Login a user
  // @router /api/users/login
  // @access public
  public async loginUser(
    userData: LoginUserDto
  ): Promise<ServiceResponse<any>> {
    const { email, password } = userData;

    try {
      const user = await User.findOne({ email });

      if (user && (await user.comparePassword(password, user.password))) {
        const token = generateToken(user._id as string);
        const { password: _, ...userData } = user.toObject();
        return { data: { ...userData, token } };
      } else {
        return { error: new HttpBadRequestError("Invalid credentials", []) };
      }
    } catch (error) {
      console.log(error);
      return {
        error: new HttpInternalServerError("Internal server error"),
      };
    }
  }

  // @desc Get User Profile
  // @router /api/users/profile
  // @access public
  public async profile(id: string) {
    try {
      const user = await User.findById(id);
      if (!user) {
        return { error: new HttpNotFoundError("User not found", []) };
      }
      const { password: _, ...userData } = user.toObject();
      return { data: userData };
    } catch (error) {
      console.log(error);
      return {
        error: new HttpNotFoundError("User not found", []),
      };
    }
  }

  // @desc Update User Profile
  // @router /api/users/profile
  // @access public
  public async updateProfile(id: string, updateData: UpdateProfileDto) {
    try {
      const user = await User.findById(id);

      if (user) {
        // Update fields only if they are provided in updateData
        if (updateData.name) user.name = updateData.name;
        if (updateData.email) user.email = updateData.email;
        if (updateData.password) user.password = updateData.password;
        if (updateData.address) user.address = updateData.address;
        if (updateData.phone) user.phone = updateData.phone;
        if (updateData.isActive !== undefined)
          user.isActive = updateData.isActive;

        await user.save();

        const { password: _, ...userData } = user.toObject();
        return { data: userData };
      } else {
        return { error: new HttpNotFoundError("User not found", []) };
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      return {
        error: new HttpInternalServerError("Internal server error"),
      };
    }
  }

  // @desc Get All Users Profile
  // @router /api/users/profile
  // @access public
  public async getAllProfiles() {
    try {
      const users = await User.find();
      console.log();

      if (users) {
        return { data: users };
      } else {
        return { error: new HttpNotFoundError("Users not found", []) };
      }
    } catch (error) {
      console.log(error);
      return {
        error: new HttpInternalServerError("Internal server error"),
      };
    }
  }

  public async deleteUserProfile(id: string) {
    try {
      const user = await User.findByIdAndDelete(id);
      console.log("user ===>", user);

      if (user) {
        return { data: user };
      } else {
        return { error: new HttpNotFoundError("User doesn't exist", []) };
      }
    } catch (error) {
      console.error("Error deleting user profile:", error);
      return {
        error: new HttpInternalServerError(
          "Internal server error. Unable to delete user"
        ),
      };
    }
  }
}
