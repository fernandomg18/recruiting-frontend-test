import React from "react";

const ConfirmationModal = ({ isOpen, onClose, creditNote, invoice }) => {
    if (!isOpen) {
      return null;
    }
  
    const newInvoiceAmount = invoice.amountInCLP - creditNote.amountInCLP;
  
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-middle bg-white rounded-lg text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Nota de crédito asignada correctamente
                    </h3>
                    <div className="mt-2">
                      <p> Nota de Factura </p>
                      <p className="text-sm text-gray-500">
                        ID: {invoice.id}
                      </p>
                      <p className="text-sm text-gray-500">
                        Monto: {invoice.amountInCLP} CLP ({invoice.amountInUSD} USD)
                      </p>
                      <p> Nota de credito </p>
                      <p className="text-sm text-gray-500">
                        ID: {creditNote.id}
                      </p>
                      <p className="text-sm text-gray-500">
                        Monto: {creditNote.amountInCLP} CLP ({creditNote.amountInUSD} USD)
                      </p>
                      
                      <p>
                        Nuevo monto a pagar: {newInvoiceAmount} {invoice.currency}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex justify-center">
                <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={onClose}>
                  Seguir asignando
                </button>
              </div>
            </div>
          </div>
        </div>
    );
};

export default ConfirmationModal;