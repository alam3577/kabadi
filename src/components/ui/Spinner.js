import React from 'react'
import Modal from './Modal'
import { Watch } from "react-loader-spinner";

function Spinner() {
  return (
    <Modal>
          <Watch
            height="80"
            width="80"
            radius="48"
            color="#4fa94d"
            ariaLabel="watch-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </Modal>
  )
}

export default Spinner