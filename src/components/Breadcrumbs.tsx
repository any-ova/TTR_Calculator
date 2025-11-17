// src/components/Breadcrumbs.tsx
import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
    const loc = useLocation();
    const parts = loc.pathname.split('/').filter(Boolean);

    return (
        <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Главная</Breadcrumb.Item>
            {parts.map((p, i) => {
                const url = '/' + parts.slice(0, i + 1).join('/');
                const title = decodeURIComponent(p);
                return (
                    <Breadcrumb.Item key={url} linkAs={Link} linkProps={{ to: url }}>
                        {title}
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
};

export default Breadcrumbs;