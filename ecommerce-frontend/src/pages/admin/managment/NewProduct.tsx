import { ChangeEvent, useState } from "react"
import { AdminSidebar } from "../../../components"
import TextField from '@mui/material/TextField';

const NewProduct = () => {

  const [name,setName] = useState<string>("");
  const [price,setPrice] = useState<number>();
  const [stock,setStock] = useState<number>();
  const [photo,setPhoto]   = useState<string>();

  const changeImageHandler = (e : ChangeEvent) => {

  }

  return (
    <>
        <div className="admin-container">
            <AdminSidebar />

            <main className="product-managment">
                <article>
                    <div className="form-head">
                        <h2>Create New Product</h2>
                    </div>
                    <form>
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
                             onChange={(e) => setPhoto(e.target.value)}
                             required
                            />
                        </div>
                        {
                          photo && <img src={photo} alt="Product Image" />
                        }
                        <button type="submit">Create</button>
                    </form>
                </article>
            </main>
        </div>
    </>
  )
}

export default NewProduct
