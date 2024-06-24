import { useState, ChangeEvent } from "react"
import { BiArrowBack } from "react-icons/bi";
import { TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";

type ShippingInfoProps = {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
}
const Shipping = () => {
    const [shippingInfo, setShippingInfo] = useState<ShippingInfoProps>(
        {
            address: "",
            city: "",
            state: "",
            country: "",
            pinCode: ""
        }
    );

    const navigate = useNavigate();

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingInfo(prev => ({ ...prev, [name]: value }));
    }

    return (
        <div className="shipping">
            <button className="back-btn" onClick={() => navigate("/cart")}>
                <BiArrowBack />
            </button>

            <form>
                <h1>Shipping Address</h1>
                {/* Address */}
                <div>
                    <TextField id="outlined-basic"
                        name="address"
                        label="Name"
                        variant="outlined"
                        value={shippingInfo.address}
                        sx={{ width: "100%" }}
                        type="text"
                        onChange={handleTextChange}
                        required
                    />
                </div>
                {/* City */}
                <div>
                    <TextField id="outlined-basic"
                        name="city"
                        label="City"
                        variant="outlined"
                        value={shippingInfo.city}
                        sx={{ width: "100%" }}
                        type="text"
                        onChange={handleTextChange}
                        required
                    />
                </div>
                {/* State */}
                <div>
                    <TextField id="outlined-basic"
                        name="state"
                        label="State"
                        variant="outlined"
                        value={shippingInfo.state}
                        sx={{ width: "100%" }}
                        type="text"
                        onChange={handleTextChange}
                        required
                    />
                </div>
                {/* Country */}
                <div>
                    <select name="country" required>
                        <option value="" disabled selected>Select a country *</option>
                        <option value="india">India</option>
                        <option value="us">US</option>
                        <option value="other">other</option>
                    </select>
                </div>
                
                {/* Pincode */}
                <div>
                    <TextField id="outlined-basic"
                        name="pinCode"
                        label="Pin Code"
                        variant="outlined"
                        value={shippingInfo.pinCode}
                        sx={{ width: "100%" }}
                        type="text"
                        onChange={handleTextChange}
                        required
                    />
                </div>

                <button className="shipping-btn">Pay now</button>
            </form>
        </div>
    )
}

export default Shipping
