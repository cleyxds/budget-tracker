import { useState } from "react"

import { Dialog } from "@headlessui/react"

import styles from "../styles/modal.module.scss"

export function Modal({ anchor, render }) {
  const hasAnchor = !!anchor
  const hasRender = !!render
  const AnchorComponent = anchor
  const RenderComponent = render

  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    if (!hasRender) return

    setIsOpen(true)
  }

  const actions = {
    openModal,
    closeModal
  }

  return (
    <>
      {hasAnchor && <AnchorComponent actions={actions} />}

      <Dialog
        as="div"
        className={styles.modalContainer}
        open={isOpen}
        onClose={closeModal}
      >
        <div className={styles.backdrop} aria-hidden="true" />

        <div className={styles.container}>
          <Dialog.Panel className={styles.panel}>
            {hasRender && <RenderComponent actions={actions} />}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}