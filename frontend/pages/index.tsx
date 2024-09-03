import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import SlotMachine from '../components/SlotMachine'

const Home: NextPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <SlotMachine />
    </div>
  )
}

export default Home
