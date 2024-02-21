import React, { memo, useCallback, useEffect, useState } from "react";
import { Card, Typography, Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input, Spinner } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";

function Product() {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);

  const [name, setName] = useState("");
  const [updateData, setUpdateData] = useState({});
  const [deleteData, setDeleteData] = useState({});
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const onNameChange = ({ target }) => setName(target.value);

  const handleGetProductData = useCallback(() => {
    setLoading(true);
    fetch("/api/products", { method: "GET" })
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setProductData(response);
      })
      .catch((error) => {
        setLoading(false);
        console.error("API Error:", error);
      });
  }, []);

  useEffect(() => {
    handleGetProductData();

    return () => {};
  }, [handleGetProductData]);

  const handleOpen = ({ target }) => {
    if (target && target.dataset.id) {
      var data = productData.find((value) => value.id === Number(target.dataset.id));
      if (!data) return;

      setName(data.name);
      setUpdateData(data);
    }

    if (open) {
      setName(null);
      setUpdateData({});
    }

    setOpen(!open);
    setSaveLoading(false);
  };

  const handleOpenDelete = ({ target }) => {
    if (target && target.dataset.id) {
      var data = productData.find((value) => value.id === Number(target.dataset.id));
      if (!data) return;

      setDeleteData(data);
    }

    if (openDelete) {
      setDeleteData({});
    }

    setOpenDelete(!openDelete);
    setDeleteLoading(false);
  };

  const handleSaveProduct = () => {
    if (!name) return;

    const url = "/api/products" + (updateData.id ? "/" + updateData.id : "");
    const method = updateData.id ? "PATCH" : "POST";

    setSaveLoading(true);
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setSaveLoading(false);
        handleOpen({});
        handleGetProductData();
      })
      .catch((error) => {
        setSaveLoading(false);
        console.error("API Error:", error);
      });
  };

  const handleDeleteProduct = () => {
    if (!deleteData.id) return;

    setDeleteLoading(true);
    fetch("/api/products/" + deleteData.id, { method: "DELETE" })
      .then((response) => response.json())
      .then((response) => {
        setSaveLoading(false);
        handleOpenDelete({});
        handleGetProductData();
      })
      .catch((error) => {
        setSaveLoading(false);
        console.error("API Error:", error);
      });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="py-4 px-8 flex items-end gap-2">
        <div className="flex-1">
          <div className="font-bold text-3xl">Master Data Product </div>
        </div>
        <div>
          <Button onClick={handleOpen} className="flex items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            Tambah Product
          </Button>
        </div>
      </div>
      <div className="flex-1 w-full overflow-hidden pb-4 px-8">
        <Card className="max-h-full h-fit w-full overflow-hidden flex flex-col">
          <div className="flex bg-black border-b border-blue-gray-100 ">
            <div className="p-4 flex-1">
              <Typography color="white" className="font-bold leading-none text-md">
                Nama Produk
              </Typography>
            </div>
            <div className="p-4 w-[217.89px] mr-[17px]">
              <Typography color="white" className="font-bold leading-none text-md">
                Aksi
              </Typography>
            </div>
          </div>
          <div className="overflow-y-auto overflow-x-hidden gutter-stable">
            {productData.length ? (
              productData.map(({ id, name }, index) => {
                return (
                  <div key={index} className="flex [&>div]:p-4 [&>div]:border-b [&>div]:border-blue-gray-50 -mr-[17px]">
                    <div className="flex-1 flex items-center">
                      <Typography color="blue-gray" className="font-normal">
                        {name}
                      </Typography>
                    </div>
                    <div className="flex gap-3 w-[217.89px] mr-[17px]">
                      <Button variant="outlined" color="red" data-id={id} onClick={handleOpenDelete}>
                        Hapus
                      </Button>
                      <Button variant="outlined" data-id={id} onClick={handleOpen}>
                        Ubah
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-3 py-5 text-center">
                {loading ? (
                  <div className="flex gap-2 items-center justify-center">
                    <Spinner /> Memuat Data...
                  </div>
                ) : (
                  "Data Kosong"
                )}
              </div>
            )}
          </div>
        </Card>
      </div>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>{updateData.id ? "Ubah" : "Tambah"} Produk</DialogHeader>
        <DialogBody>
          <div className="mb-1">
            <Input label="Nama Product" size="lg" placeholder="example: Product 22" value={name} onChange={onNameChange} />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={handleOpen} className="mr-3">
            <span>Batal</span>
          </Button>
          <Button color="green" loading={saveLoading} onClick={handleSaveProduct}>
            <span>Simpan</span>
          </Button>
        </DialogFooter>
      </Dialog>

      <Dialog open={openDelete} handler={handleOpenDelete}>
        <DialogHeader>Hapus Produk</DialogHeader>
        <DialogBody>Apakah anda yakin ingin menghapus {deleteData.name}?</DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={handleOpenDelete} className="mr-3">
            <span>Batal</span>
          </Button>
          <Button color="red" loading={deleteLoading} onClick={handleDeleteProduct}>
            <span>Hapus</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

Product.propTypes = {};

export default memo(Product);
