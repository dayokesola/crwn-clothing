import {
    BackgroundImage,
    Body,
    DirectoryItemContainer
} from './directory-item.styles';

import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({ directory }) => {

    const navigate = useNavigate();
    const onNavClick = () => navigate(route);

    const { title, imageUrl, route } = directory;
    return (
        <DirectoryItemContainer onClick={onNavClick}>
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    )
}
export default DirectoryItem;