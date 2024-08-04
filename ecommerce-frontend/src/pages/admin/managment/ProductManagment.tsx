import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { AdminSidebar, ProductDetailSkeleton } from "../../../components";
import TextField from '@mui/material/TextField';
import { useDeleteProductMutation, useProductDetailsQuery, useUpdateProductMutation } from "../../../redux/api/productApi";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { RootState, server } from "../../../redux/store";
import { useSelector } from "react-redux";
import { responseToast } from "../../../utils/features";

const ProductManagment = () => {
    const { id : productId } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, isError } = useProductDetailsQuery(productId as string);

    const {user} = useSelector((state : RootState) => state.userReducer);

    const { photo, category, name, stock, price } = data?.product || {
        photo: "",
        category: "",
        name: "",
        stock: 0,
        price: 0
    };

    const [nameUpdate, setNameUpdate] = useState<string>(name);
    const [priceUpdate, setPriceUpdate] = useState<number>(price);
    const [stockUpdate, setStockUpdate] = useState<number>(stock);
    const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
    const [photoUpdate, setPhotoUpdate] = useState<string>(photo);
    const [photoFile, setPhotoFile] = useState<File>();

    const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e.target.files?.[0];
        // console.log("file : ", file);

        const reader: FileReader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setPhotoUpdate(reader.result);
                    setPhotoFile(file);
                }
            }
        }
    }

    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();

        if(nameUpdate) formData.set("name", nameUpdate);
        if(priceUpdate) formData.set("price", priceUpdate.toString());
        if(stockUpdate !== undefined) formData.set("stock", stockUpdate.toString());
        if(categoryUpdate) formData.set("category", categoryUpdate);
        if(photoFile) formData.set("photo", photoFile);

        const res = await updateProduct({formData, userId : user?._id! , productId : productId! });

        responseToast(res, navigate, "/admin/product");

    }

    const deleteHandler = async () => {
        const res = await deleteProduct({userId : user?._id!, productId : productId!})
        responseToast(res, navigate, "/admin/product");
    }

    useEffect(() => {
        if (data) {
            setNameUpdate(name);
            setCategoryUpdate(category);
            setPriceUpdate(price);
            setStockUpdate(stock);
        }
    }, [data])

    if(isError) return <Navigate to={"/404"} />

    return (
        <>
            <div className="admin-container">
                <AdminSidebar />

                <main className="product-managment">
                    {isLoading ? <ProductDetailSkeleton /> :
                        <>
                            <article>
                                <div className="product-info">
                                    {stockUpdate > 0 && <span className="stock">{stockUpdate} Available</span>}
                                    <strong>ID - {data?.product._id}</strong>
                                    <img src={`${server}/${data?.product.photo}`} alt="product" />
                                    <p>{nameUpdate}</p>
                                    {
                                        stockUpdate > 0 ? <span className="green">Availbale</span> : <span className="red">Not Available</span>
                                    }
                                    <h3>${priceUpdate}</h3>
                                </div>
                                <form onSubmit={submitHandler}>
                                    {/* Name */}
                                    <div>
                                        <TextField id="outlined-basic"
                                            label="Name"
                                            variant="outlined"
                                            value={nameUpdate}
                                            sx={{ width: "100%" }}
                                            type="text"
                                            onChange={(e) => setNameUpdate(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {/* Category */}
                                    <div>
                                        <TextField id="outlined-basic"
                                            label="Category"
                                            variant="outlined"
                                            value={categoryUpdate}
                                            sx={{ width: "100%" }}
                                            type="text"
                                            onChange={(e) => setCategoryUpdate(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {/* Price */}
                                    <div>
                                        <TextField id="outlined-basic"
                                            label="Price"
                                            variant="outlined"
                                            sx={{ width: "100%" }}
                                            type="number"
                                            value={priceUpdate}
                                            onChange={(e) => setPriceUpdate(Number(e.target.value))}
                                            required
                                        />
                                    </div>
                                    {/* Stock */}
                                    <div>
                                        <TextField id="outlined-basic"
                                            label="Stock"
                                            variant="outlined"
                                            sx={{ width: "100%" }}
                                            value={stockUpdate}
                                            type="number"
                                            onChange={(e) => setStockUpdate(Number(e.target.value))}
                                            required
                                        />
                                    </div>
                                    {/* Photo */}
                                    <div>
                                        <label>Photo</label>
                                        <TextField id="outlined-basic"
                                            type="file"
                                            sx={{ width: "100%" }}
                                            variant="outlined"
                                            onChange={changeImageHandler}
                                            required
                                        />
                                    </div>
                                    {
                                        photoUpdate && <img src={photoUpdate} className="preview-image" alt="selected image" />
                                    }
                                    <button type="submit">Update</button>
                                    <button onClick={deleteHandler}>Delete</button>
                                </form>
                            </article>
                        </>

                    }
                </main>
            </div>
        </>
    )
}

export default ProductManagment
