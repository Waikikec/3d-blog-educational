import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Product from './Product';
import { publicRequest } from '../utils/requestMethods';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px 120px;
`;

const Products = ({ category, filters, sort }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await publicRequest.get(
                    (category && category !== 'catalog')
                        ? (`/models?category=${category}`)
                        : '/models'
                );
                setProducts(res.data);
            } catch (error) { }
        }
        getProducts();
    }, [category]);

    useEffect(() => {
        category &&
            setFilteredProducts(
                products.filter((item) =>
                    Object.entries(filters).every(([key, value]) =>
                        item[key].includes(value),
                    )
                )
            )
    }, [products, category, filters]);

    useEffect(() => {
        if (sort === 'asc') {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) =>
                    new Date(a.createdAt) - new Date(b.createdAt))
            );
        } else if (sort === 'desc') {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt))
            );
        }
    }, [sort]);

    return (
        <Container>
            {(() => {
                if (!category) {
                    return (
                        products.slice(0, 14).map(item => <Product item={item} key={item._id} />)
                    )
                } else if (category === 'catalog') {
                    return (
                        filteredProducts.map(item => <Product item={item} key={item._id} />)
                    )
                } else {
                    return (
                        filteredProducts.map(item => <Product item={item} key={item._id} />)
                    )
                }
            })()}
        </Container>
    )
}

export default Products
