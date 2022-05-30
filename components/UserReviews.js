import fetchUserReviews from "./FetchUserReviews";
import { useState, useEffect } from "react";
import AccountPageReviewCard from './AccountPageReviewCard';

export default function UserReviews({id}) {
  let reviews = [];
  async function fetchReviews() {
    const res = await fetchUserReviews(id);
    reviews = res;
    console.log('review 9', reviews);
  } 
  useEffect(() => {fetchReviews()},[]);
  
  console.log('res', reviews);
  return (
    <div>
      {rev.map((review, i) => (
        <AccountPageReviewCard review={review} key={i}/>
      ))}
     
    </div>
  )
}