import React from "react";
import { TbTrash, TbX } from "react-icons/tb";

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  isDeleting,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open modal-bottom sm:modal-middle backdrop-blur-sm">
      <div className="modal-box border border-base-200 shadow-2xl">
        <div className="flex justify-between items-start">
          <div className="bg-error/10 p-3 rounded-full">
            <TbTrash className="text-error text-2xl" />
          </div>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
            <TbX size={20} />
          </button>
        </div>

        <div className="mt-4 space-y-2">
          <h3 className="font-bold text-xl">আইটেমটি বাদ দিতে চান?</h3>
          <p className="text-base-content/70">
            আপনি কি নিশ্চিত যে{" "}
            <span className="font-semibold text-base-content">
              {`"${itemName}"`}
            </span>{" "}
            আপনার কার্ট থেকে মুছে ফেলতে চান?
          </p>
        </div>

        <div className="modal-action gap-3 mt-8">
          <button
            className="btn btn-ghost flex-1"
            onClick={onClose}
            disabled={isDeleting}
          >
            বাতিল করুন
          </button>
          <button
            className={`btn btn-error flex-1 text-white ${isDeleting ? "loading" : ""}`}
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "মুছে ফেলা হচ্ছে..." : "হ্যাঁ, মুছে ফেলুন"}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default DeleteConfirmModal;
