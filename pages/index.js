import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import fetch from 'node-fetch'
import Image from 'next/image'
import React, {useState} from 'react'


export async function getStaticProps() {
  const response = await fetch(
    'https://restcountries.eu/rest/v2/all'  )
  const postList = await response.json()
  return{
    props: {
      initPostList: postList
    }
  }
}

export async function search(name) {
  const searchRes = await fetch(`https://restcountries.eu/rest/v2/name/${name}`)
  return searchRes.json()
}

export default function Home({ initPostList }) {
  const [name, setName] = useState('');
  const [postList, setPostList] = useState(initPostList);
  const handleName = (event) => {
    setName(event.target.value)
    search(event.target.value).then(setPostList)
  }
  return (
    <Layout>
      <div className={styles.header}>
        <div className={styles.title}>Your world</div>
      </div>
      <div className='search'>
      <input type="text" value={name} onChange={(event) => handleName(event)}  placeholder="Search for a country..." className={styles.search_field}/>
      </div>
      <div className={styles.country_container}>
        { Array.isArray(postList) ? postList.map((List) => {
          return(
            <div className={styles.country_card}>
              <div className={styles.card_top}>
                <Image src={List.flag} width={264} height={160} className={styles.flag} />
              </div>
              <div className={styles.card_bottom}>
                <div className={styles.country_name}>
                  {List.name}
                </div>
                <ul className={styles.country_detail}>
                  <li><span className={styles.key}>Population:</span>{Number(List.population).toLocaleString()}</li>
                  <li><span className={styles.key}>Region:</span>{List.region}</li>
                  <li><span className={styles.key}>Capital:</span>{List.capital}</li>
                </ul>
              </div>
            </div>
          )
        }):
          <div className={styles.not_found}>NotFound</div>
        }
      </div>
    </Layout>
  )
}