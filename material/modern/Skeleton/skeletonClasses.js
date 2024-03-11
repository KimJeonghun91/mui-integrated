import generateUtilityClasses from 'my-mui/utils/generateUtilityClasses';
import generateUtilityClass from 'my-mui/utils/generateUtilityClass';
export function getSkeletonUtilityClass(slot) {
  return generateUtilityClass('MuiSkeleton', slot);
}
const skeletonClasses = generateUtilityClasses('MuiSkeleton', ['root', 'text', 'rectangular', 'rounded', 'circular', 'pulse', 'wave', 'withChildren', 'fitContent', 'heightAuto']);
export default skeletonClasses;