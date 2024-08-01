import { ChangeEvent, FormEvent, useState } from "react";
import { AdminSidebar } from "../../../components";
import TextField from "@mui/material/TextField";
import { useNewProductMutation } from "../../../redux/api/productApi";
import { responseToast } from "../../../utils/features";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const NewProduct = () => {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [stock, setStock] = useState<number>();
  const [prevPhoto, setPrevPhoto] = useState<string>();
  const [photo, setPhoto] = useState<File>();

  const {user} = useSelector((state : RootState) => state.userReducer );

  const [newProduct] = useNewProductMutation();

  const navigate = useNavigate();


  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    
    if (!name || !price || !stock || !photo || !category) {
      return;
    }
    
    const formData = new FormData();
    
    formData.set("name", name);
    formData.set("category", category);
    formData.set("price", price?.toString());
    formData.set("stock", stock?.toString());
    formData.set("photo", photo);

    const res = await newProduct({ formData, id : user?._id! });

    responseToast(res, navigate, "/admin/product");
  };

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    console.log("file : ", file);

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPrevPhoto(reader.result)
          setPhoto(file);
        }
      };
    }
  };

  return (
    <>
        <div className="admin-container">
            <AdminSidebar />

            <main className="product-managment">
                <article>
                    <div className="form-head">
                        <h2>Create New Product</h2>
                    </div>
                    <form onSubmit={submitHandler}>
                        {/* Name */}
                        <div>
                            <TextField id="outlined-basic"
                             label="Name" 
                             variant="outlined"
                             value={name}
                             sx={{width : "100%"}}
                             type="text"
                             onChange={(e) => setName(e.target.value)}
                             required
                            />
                        </div>
                        {/* Category */}
                        <div>
                            <TextField id="outlined-basic"
                             label="Category" 
                             variant="outlined"
                             value={category}
                             sx={{width : "100%"}}
                             type="text"
                             onChange={(e) => setCategory(e.target.value)}
                             required
                            />
                        </div>
                        {/* Price */}
                        <div>
                            <TextField id="outlined-basic"
                             label="Price" 
                             variant="outlined"
                             sx={{width : "100%"}}
                             type="number"
                             value={price}
                             onChange={(e) => setPrice(Number(e.target.value))}
                             required
                            />
                        </div>
                        {/* Stock */}
                        <div>
                            <TextField id="outlined-basic"
                             label="Stock" 
                             variant="outlined"
                             sx={{width : "100%"}}
                             value={stock}
                             type="number"
                             onChange={(e) => setStock(Number(e.target.value))}
                             required
                            />
                        </div>
                        {/* Photo */}
                        <div>
                            <label>Photo</label>
                            <TextField id="outlined-basic"
                             type="file"
                             sx={{width : "100%"}}
                             variant="outlined"
                             onChange={changeImageHandler}
                             required
                            />
                        </div>
                        {
                          photo && <img src={prevPhoto} className="preview-image" alt="Product Image" />
                        }
                        <button type="submit" onClick={() => submitHandler}>Create</button>
                    </form>
                </article>
            </main>
        </div>
    </>
  )
};

export default NewProduct;
