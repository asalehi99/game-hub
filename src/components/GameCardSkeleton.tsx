import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const GameCardSkeleton = () => {
  return (
    <div>
      <Card width="300px" overflow="hidden" borderRadius={10}>
        <Skeleton height="200px" />
        <CardBody>
          <SkeletonText />
        </CardBody>
      </Card>
    </div>
  );
};

export default GameCardSkeleton;
