import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import {
  getLatestArticleNumberFromContract,
  getArticleHashFromContract,
  purchaseArticle,
} from '../utils/DinoContext';
import {
  MarketAddress,
  MarketAddressABI,
  infuraProjectId,
} from '../utils/constants.js';
import axios from 'axios';

const ReadArticlePage = () => {
  const [latestArticleNumber, setLatestArticleNumber] =
    useState(null);
  const [articleData, setArticleData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [categories, setCategories] = useState([
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Food' },
    { id: 3, name: 'Travel' },
  ]);

  useEffect(() => {
    async function fetchLatestArticleNumber() {
      try {
        const number = await getLatestArticleNumberFromContract();
        setLatestArticleNumber(number);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchLatestArticleNumber();
    fetchArticleDetails();
  }, []);

  const fetchArticleDetails = async () => {
    console.log('geldi');
    try {
      const fetchedArticleData = [];
      console.log('2');
      for (
        let tokenId = 1;
        tokenId <= latestArticleNumber;
        tokenId++
      ) {
        const articleHash = await getArticleHashFromContract(tokenId);
        console.log({ articleHash });

        const ipfsUrl = `https://gateway.ipfs.io/ipfs/${articleHash}`;
        const response = await axios.get(ipfsUrl);
        const articleDetails = response.data;

        fetchedArticleData.push({
          tokenId,
          articleHash,
          articleDetails,
        });
      }

      setArticleData(fetchedArticleData);
    } catch (error) {
      console.error('Error fetching article details:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex p-4">
        {/* Articles */}
        <div className="w-3/4 p-4">
          <h2 className="text-xl font-semibold mb-4">Articles</h2>
          {articleData.map((article) => (
            <div
              key={article.tokenId}
              className="mb-4 rounded-lg p-4 bg-white shadow-md"
            >
              <h3 className="text-lg font-semibold">
                Article {article.tokenId}
              </h3>
              <p className="text-gray-600">
                Category: <b>{article.articleDetails.category}</b> |
                Price: <b>{article.articleDetails.price} ETH</b>
              </p>
              <p>{article.articleDetails.text}</p>
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() =>
                  purchaseArticle(
                    article.tokenId,
                    article.articleDetails.price
                  )
                }
              >
                Buy
              </button>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="w-1/4 bg-gray-100 p-4">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <ul>
            {categories.map((category) => (
              <li
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`cursor-pointer rounded-md p-2 mb-2 ${
                  selectedCategory === category.name
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReadArticlePage;
