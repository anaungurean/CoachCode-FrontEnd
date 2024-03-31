import PropTypes from "prop-types";
import { MoreVertical } from "lucide-react";

const UserAvatar = ({ user }) => {
    return (
        <div className="border-t flex p-3">
            {user.avatar && (
                <img src={user.avatar} alt="User Avatar" className="w-10 h-10 rounded-md" />
            )}
            <div className="flex justify-between items-center overflow-hidden transition-all w-52 ml-3">
                <div className="leading-4">
                    <h4 className="font-semibold">{user.name}</h4>
                    <span className="text-xs text-gray-600">{user.email}</span>
                </div>
                <MoreVertical size={20} />
            </div>
        </div>
    );
};

UserAvatar.propTypes = {
    user: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};

export default UserAvatar;
