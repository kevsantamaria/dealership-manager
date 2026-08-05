import AddSupplierForm from '@/features/panel/suppliers/components/add-supplier-form'

function AddSupplier() {
  return (
    <section>
      <h1 className="text-center m-4 mb-8 text-xl font-bold">
        Agregar nuevo proveedor
      </h1>
      <AddSupplierForm />
    </section>
  )
}

export default AddSupplier
