import { Button } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { RecommendationContent, Tag } from '../../../../types.generated';
import { StyledTag } from '../../../entity/shared/components/styled/StyledTag';
import { navigateToSearchUrl } from '../../../search/utils/navigateToSearchUrl';

const TagSearchListContainer = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    flex-wrap: wrap;
`;

const TagContainer = styled.div`
    margin-bottom: 4px;
`;

const TagButton = styled(Button)`
    margin: 0px;
    padding: 0px;
    font-weight: 500;
`;

type Props = {
    content: Array<RecommendationContent>;
    onClick?: (index: number) => void;
};

export const TagSearchList = ({ content, onClick }: Props) => {
    const history = useHistory();

    const tags: Array<Tag> = content
        .map((cnt) => cnt.entity)
        .filter((entity) => entity !== null && entity !== undefined)
        .map((entity) => entity as Tag);

    const onClickTag = (tag: any, index: number) => {
        onClick?.(index);
        navigateToSearchUrl({
            filters: [
                {
                    field: 'tags',
                    value: tag.urn,
                },
            ],
            history,
        });
    };

    return (
        <TagSearchListContainer>
            {tags.map((tag, index) => (
                <TagContainer>
                    <TagButton type="link" key={tag.urn} onClick={() => onClickTag(tag, index)}>
                        <StyledTag $colorHash={tag?.urn} $color={tag?.properties?.colorHex} closable={false}>
                            {tag?.name}
                        </StyledTag>
                    </TagButton>
                </TagContainer>
            ))}
        </TagSearchListContainer>
    );
};
