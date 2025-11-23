package com.hmk.ecom_project.service;

import com.hmk.ecom_project.model.Product;
import com.hmk.ecom_project.repository.ProductRepo;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductRepo repo;


    public List<Product> getProds() {
        return repo.findAll();
    }

    public Product getProdbyId(int pro) {
       return repo.findById(pro).orElse(null);
    }

    public Product addProduct(@org.jetbrains.annotations.NotNull Product prod, @NotNull MultipartFile imgFile) throws IOException {

        prod.setImgName(imgFile.getOriginalFilename());
        prod.setImgType(imgFile.getContentType());
        prod.setImgData(imgFile.getBytes());
        System.out.println("Image size: " + imgFile.getSize());

        return repo.save(prod);
    }

    public Product setRepo(@PathVariable int id, @RequestPart Product prod, @RequestPart MultipartFile imgFile) throws IOException {

            prod.setImgData(imgFile.getBytes());
            prod.setImgName(imgFile.getOriginalFilename());
            prod.setImgType(imgFile.getContentType());

        return repo.save(prod);
    }

    public void delProbyId(int pro) {
        repo.deleteById(pro);
    }
    public List<Product> searchProducts(String keyword) {
        return repo.searchProducts(keyword);
    }
}
